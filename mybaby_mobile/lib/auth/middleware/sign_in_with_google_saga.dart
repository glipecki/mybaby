import 'package:google_sign_in/google_sign_in.dart';
import 'package:mybaby_mobile/auth/actions/authentication_success_action.dart';
import 'package:mybaby_mobile/auth/actions/sign_in_with_google_action.dart';
import 'package:mybaby_mobile/auth/authentication_service.dart';
import 'package:mybaby_mobile/common/redux/async.dart';
import 'package:mybaby_mobile/state/app_state.dart';
import 'package:redux/redux.dart';

class SignInWithGoogleSaga implements Saga<AppState> {
  GoogleSignIn _googleSignIn;
  AuthenticationService _authenticationService;

  SignInWithGoogleSaga(this._googleSignIn, this._authenticationService);

  @override
  call(Store<AppState> store, action) async {
    if (action is SignInWithGoogleAction) {
      final GoogleSignInAccount googleUser = await _googleSignIn.signIn();
      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;
      final User user = await _authenticationService.signInWithGoogle(
          googleAuth.idToken, googleAuth.accessToken);
      store.dispatch(AuthenticationSuccessAction(
          name: user.name, email: user.email, photoUrl: user.photoUrl));
    }
  }
}
