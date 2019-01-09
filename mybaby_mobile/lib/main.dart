import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:mybaby_mobile/auth/actions/check_authentication_action.dart';
import 'package:mybaby_mobile/auth/actions/sign_in_with_email_action.dart';
import 'package:mybaby_mobile/auth/actions/sign_in_with_google_action.dart';
import 'package:mybaby_mobile/auth/actions/sign_out_action.dart';
import 'package:mybaby_mobile/common/redux/async.dart';
import 'package:mybaby_mobile/injector.dart';
import 'package:mybaby_mobile/my_baby.dart';
import 'package:mybaby_mobile/state/app_state.dart';
import 'package:redux/redux.dart';
import 'package:redux_logging/redux_logging.dart';

void main() {
  var asyncMiddleware = AsyncMiddleware();
  asyncMiddleware.take(
      CheckAuthenticationAction, injector.checkAuthenticationSaga());
  asyncMiddleware.take(SignInWithEmailAction, injector.loginWithEmailSaga());
  asyncMiddleware.take(SignInWithGoogleAction, injector.signInWithGoogleSaga());
  asyncMiddleware.take(SignOutAction, injector.logOutSaga());
  asyncMiddleware.take(SignOutAction, injector.signOutWithGoogleSaga());
  var store = Store<AppState>(
    combineReducers([
      injector.authenticationStateReducer(),
    ]),
    initialState: AppState.initial(),
    middleware: [
      LoggingMiddleware.printer(),
      asyncMiddleware,
    ],
  );
  return runApp(
    StoreProvider<AppState>(
      store: store,
      child: MyBaby(),
    ),
  );
}
