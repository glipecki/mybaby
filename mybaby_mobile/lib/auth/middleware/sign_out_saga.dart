import 'package:mybaby_mobile/auth/actions/sign_out_action.dart';
import 'package:mybaby_mobile/auth/actions/user_signed_out_action.dart';
import 'package:mybaby_mobile/auth/authentication_service.dart';
import 'package:mybaby_mobile/common/redux/async.dart';
import 'package:mybaby_mobile/state/app_state.dart';
import 'package:redux/redux.dart';

class SignOutSaga implements Saga<AppState> {
  AuthenticationService _authenticationService;

  SignOutSaga(this._authenticationService);

  @override
  call(Store<AppState> store, action) async {
    if (action is SignOutAction) {
      await _authenticationService.signOut();
      store.dispatch(UserSignedOutAction());
    }
  }
}
