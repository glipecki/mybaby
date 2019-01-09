import 'package:mybaby_mobile/auth/actions/authentication_failure_action.dart';
import 'package:mybaby_mobile/auth/actions/authentication_success_action.dart';
import 'package:mybaby_mobile/auth/authentication_service.dart';
import 'package:mybaby_mobile/common/redux/async.dart';
import 'package:mybaby_mobile/state/app_state.dart';
import 'package:redux/redux.dart';

class CheckAuthenticationSaga implements Saga<AppState> {
  AuthenticationService _authenticationService;

  CheckAuthenticationSaga(this._authenticationService);

  @override
  call(Store<AppState> store, action) async {
    final bool authenticated = await _authenticationService.authenticated();
    if (authenticated) {
      final User user = await _authenticationService.currentUser();
      store.dispatch(AuthenticationSuccessAction(
          name: user.name, email: user.email, photoUrl: user.photoUrl));
    } else {
      store.dispatch(AuthenticationFailureAction());
    }
  }
}
