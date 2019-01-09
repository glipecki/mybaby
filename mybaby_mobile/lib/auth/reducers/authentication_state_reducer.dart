import 'package:mybaby_mobile/auth/actions/authentication_failure_action.dart';
import 'package:mybaby_mobile/auth/actions/authentication_success_action.dart';
import 'package:mybaby_mobile/auth/actions/user_signed_out_action.dart';
import 'package:mybaby_mobile/state/app_state.dart';
import 'package:redux/redux.dart';

class AuthenticationStateReducer implements ReducerClass<AppState> {
  @override
  AppState call(AppState state, action) {
    if (action is AuthenticationSuccessAction) {
      return state.copyWith(
        authentication: Authentication(
          state: AuthenticationState.authenticated,
          user: User(
              name: action.name,
              email: action.email,
              photoUrl: action.photoUrl),
        ),
      );
    } else if (action is AuthenticationFailureAction) {
      return state.copyWith(
          authentication: Authentication(state: AuthenticationState.anonymous));
    } else if (action is UserSignedOutAction) {
      return state.copyWith(
          authentication: Authentication(state: AuthenticationState.anonymous));
    } else {
      return state;
    }
  }
}
