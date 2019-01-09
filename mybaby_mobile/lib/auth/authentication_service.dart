import 'package:mybaby_mobile/state/app_state.dart';

abstract class AuthenticationService {
  Future<bool> authenticated();

  Future<User> signInWithEmail(String email, String password);

  Future<User> signInWithGoogle(String idToken, String accessToken);

  Future<User> currentUser();

  Future<void> signOut();
}
