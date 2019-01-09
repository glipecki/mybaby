import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:mybaby_mobile/auth/actions/check_authentication_action.dart';
import 'package:mybaby_mobile/auth/widgets/login_widget.dart';
import 'package:mybaby_mobile/dashboard/widgets/dashboard_widget.dart';
import 'package:mybaby_mobile/init/widgets/init_widget.dart';
import 'package:mybaby_mobile/state/app_state.dart';

class MyBaby extends StatelessWidget {
  @override
  Widget build(context) => StoreConnector<AppState, AuthenticationState>(
        onInit: (store) => store.dispatch(CheckAuthenticationAction()),
        converter: (store) => store.state.authentication.state,
        builder: (context, authenticationState) => MaterialApp(
              title: 'My Baby',
              theme: ThemeData.dark().copyWith(
                accentColor: Colors.red[900],
              ),
              home: _homeScreen(authenticationState),
              routes: {
                DashboardWidget.route: (context) => DashboardWidget(),
              },
            ),
      );

  _homeScreen(AuthenticationState authenticationState) {
    switch (authenticationState) {
      case AuthenticationState.unknown:
      case AuthenticationState.authenticating:
        return InitWidget();
      case AuthenticationState.anonymous:
        return LoginWidget();
      case AuthenticationState.authenticated:
        return DashboardWidget();
    }
  }
}
