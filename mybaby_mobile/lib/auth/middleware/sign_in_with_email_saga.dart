import 'package:mybaby_mobile/auth/actions/authentication_success_action.dart';
import 'package:mybaby_mobile/auth/actions/sign_in_with_email_action.dart';
import 'package:mybaby_mobile/auth/authentication_service.dart';
import 'package:mybaby_mobile/common/redux/async.dart';
import 'package:mybaby_mobile/state/app_state.dart';
import 'package:redux/redux.dart';

class SignInWithEmailSaga implements Saga<AppState> {
  AuthenticationService _authenticationService;

  SignInWithEmailSaga(this._authenticationService);

  @override
  call(Store<AppState> store, action) async {
    if (action is SignInWithEmailAction) {
      final User user = await _authenticationService.signInWithEmail(
          action.email, action.password);
      store.dispatch(AuthenticationSuccessAction(
          name: user.name, email: user.email, photoUrl: user.photoUrl));
      // TODO: if fail dispatch fail
    }
  }
}
