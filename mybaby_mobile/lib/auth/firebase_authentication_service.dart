import 'package:firebase_auth/firebase_auth.dart';
import 'package:mybaby_mobile/auth/authentication_service.dart';
import 'package:mybaby_mobile/state/app_state.dart';

class FirebaseAuthenticationService implements AuthenticationService {
  final FirebaseAuth firebaseAuth;

  FirebaseAuthenticationService(this.firebaseAuth);

  @override
  Future<bool> authenticated() async {
    return await firebaseAuth.currentUser() != null;
  }

  @override
  Future<User> signInWithEmail(String email, String password) async {
    await firebaseAuth.signInWithEmailAndPassword(
        email: email, password: password);
    return currentUser();
  }

  @override
  Future<User> currentUser() async {
    final FirebaseUser user = await firebaseAuth.currentUser();
    return User(
        name: user.displayName ?? '',
        email: _userEmail(user) ?? '',
        photoUrl: user.photoUrl ?? '');
  }

  @override
  Future<void> signOut() async {
    return await firebaseAuth.signOut();
  }

  @override
  Future<User> signInWithGoogle(String idToken, String accessToken) async {
    await firebaseAuth.signInWithGoogle(
        idToken: idToken, accessToken: accessToken);
    return currentUser();
  }

  String _userEmail(FirebaseUser user) {
    if (user.email != null) {
      return user.email;
    }
    if (user.providerData != null && user.providerData.isNotEmpty) {
      return user.providerData
          .map((userInfo) => userInfo.email)
          .where((email) => email != null)
          .first;
    }
    return null;
  }
}
