import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:mybaby_mobile/auth/actions/sign_in_with_email_action.dart';
import 'package:mybaby_mobile/auth/actions/sign_in_with_google_action.dart';
import 'package:mybaby_mobile/state/app_state.dart';

class LoginWidget extends StatefulWidget {
  @override
  LoginWidgetState createState() {
    return new LoginWidgetState();
  }
}

// TODO
// - wydzielenie formatki do osobnego widgetu
// - zapakowanie przycisków w funkcję?
// - obsługa walidacji i błędów?

class LoginWidgetState extends State<LoginWidget> {
  final TextEditingController _loginController = TextEditingController();

  final TextEditingController _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text("Login"),
        ),
        body: Center(
          child: Container(
            padding: EdgeInsets.only(left: 24.0, right: 24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
//                SizedBox(
//                  height: 20,
//                ),
                // TODO: mybaby image
                TextFormField(
                  keyboardType: TextInputType.emailAddress,
                  maxLines: 1,
                  autocorrect: false,
                  controller: _loginController,
                  decoration: InputDecoration(
                    hintText: 'email',
                    contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                  ),
                ),
                TextFormField(
                  obscureText: true,
                  maxLines: 1,
                  autocorrect: false,
                  controller: _passwordController,
                  decoration: InputDecoration(
                    hintText: 'hasło',
                    contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                StoreConnector<AppState,
                    Function(String email, String password)>(
                  converter: (store) => (email, password) =>
                      store.dispatch(SignInWithEmailAction(email, password)),
                  builder: (context, callback) => SizedBox(
                        width: 120,
                        child: RaisedButton(
                          child: Text("Login"),
                          color: Theme.of(context).accentColor,
                          onPressed: () => callback(
                              _loginController.text, _passwordController.text),
                        ),
                      ),
                ),
                SizedBox(
                  height: 20,
                ),
                Divider(),
                SizedBox(
                  height: 20,
                ),
                SizedBox(
                  width: 120,
                  child: StoreConnector<AppState, Function()>(
                    converter: (store) =>
                        () => store.dispatch(SignInWithGoogleAction()),
                    builder: (context, callback) => RaisedButton(
                          child: Text("Google"),
                          color: Theme.of(context).accentColor,
                          onPressed: callback,
                        ),
                  ),
                ),
                SizedBox(
                  width: 120,
                  child: RaisedButton(
                    child: Text(
                      "Facebook",
                      style: TextStyle(
                        decoration: TextDecoration.lineThrough,
                      ),
                    ),
                    color: Theme.of(context).accentColor,
                    onPressed: () {},
                  ),
                ),
              ],
            ),
          ),
        ),
      );
}
