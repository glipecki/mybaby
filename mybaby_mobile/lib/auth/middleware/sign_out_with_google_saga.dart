import 'package:google_sign_in/google_sign_in.dart';
import 'package:mybaby_mobile/auth/actions/sign_out_action.dart';
import 'package:mybaby_mobile/common/redux/async.dart';
import 'package:mybaby_mobile/state/app_state.dart';
import 'package:redux/redux.dart';

class SignOutWithGoogleSaga implements Saga<AppState> {
  GoogleSignIn _googleSignIn;

  SignOutWithGoogleSaga(this._googleSignIn);

  @override
  call(Store<AppState> store, action) async {
    if (action is SignOutAction) {
      if (await _googleSignIn.isSignedIn()) {
        _googleSignIn.signOut();
      }
    }
  }
}
