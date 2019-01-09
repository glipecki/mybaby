import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:mybaby_mobile/auth/authentication_service.dart';
import 'package:mybaby_mobile/auth/middleware/sign_out_with_google_saga.dart';
import 'package:mybaby_mobile/auth/reducers/authentication_state_reducer.dart';
import 'package:mybaby_mobile/auth/middleware/check_authentication_saga.dart';
import 'package:mybaby_mobile/auth/middleware/sign_out_saga.dart';
import 'package:mybaby_mobile/auth/middleware/sign_in_with_email_saga.dart';
import 'package:mybaby_mobile/auth/middleware/sign_in_with_google_saga.dart';
import 'package:mybaby_mobile/auth/firebase_authentication_service.dart';

class Injector {
  AuthenticationService _authenticationService;
  CheckAuthenticationSaga _checkAuthenticationSaga;
  AuthenticationStateReducer _authenticationStateReducer;
  GoogleSignIn _googleSignIn;
  FirebaseApp _firebaseApp;
  SignInWithEmailSaga _loginWithEmailSaga;
  SignInWithGoogleSaga _signInWithGoogleSaga;
  SignOutWithGoogleSaga _signOutWithGoogleSaga;
  SignOutSaga _logOutSaga;

  Injector() {
    _firebaseApp = FirebaseApp.instance;
    _googleSignIn = GoogleSignIn();
    _authenticationService =
        FirebaseAuthenticationService(FirebaseAuth.fromApp(_firebaseApp));
    _checkAuthenticationSaga = CheckAuthenticationSaga(_authenticationService);
    _logOutSaga = SignOutSaga(_authenticationService);
    _loginWithEmailSaga = SignInWithEmailSaga(_authenticationService);
    _signInWithGoogleSaga =
        SignInWithGoogleSaga(_googleSignIn, _authenticationService);
    _signOutWithGoogleSaga = SignOutWithGoogleSaga(_googleSignIn);
    _authenticationStateReducer = AuthenticationStateReducer();
  }

  AuthenticationService authenticationService() => _authenticationService;

  AuthenticationStateReducer authenticationStateReducer() =>
      _authenticationStateReducer;

  CheckAuthenticationSaga checkAuthenticationSaga() => _checkAuthenticationSaga;

  SignInWithEmailSaga loginWithEmailSaga() => _loginWithEmailSaga;

  SignInWithGoogleSaga signInWithGoogleSaga() => _signInWithGoogleSaga;

  SignOutWithGoogleSaga signOutWithGoogleSaga() => _signOutWithGoogleSaga;

  SignOutSaga logOutSaga() => _logOutSaga;
}

final injector = Injector();
