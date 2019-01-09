import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:mybaby_mobile/auth/actions/sign_out_action.dart';
import 'package:mybaby_mobile/state/app_state.dart';

class DashboardWidget extends StatelessWidget {
  static const String route = "/home";

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text("MyBaby"),
        ),
        body: Center(
          child: Column(
            children: <Widget>[
              // TODO: fetch babies
              // TODO: kręcioł
              // TODO: załadowanie gdy przyjdzie
              StoreConnector<AppState, List<DropdownMenuItem<Baby>>>(
                converter: (store) => store.state.babies
                    .map(
                      (baby) => DropdownMenuItem<Baby>(
                            child: Text(baby.firstName),
                            value: baby,
                          ),
                    )
                    .toList(),
                builder: (context, babies) => DropdownButton<Baby>(
                      items: babies,
                      onChanged: (_) {},
                    ),
              )
            ],
          ),
        ),
        drawer: Drawer(
          child: ListView(
            children: <Widget>[
              StoreConnector<AppState, User>(
                converter: (store) => store.state.authentication.user,
                builder: (context, user) => UserAccountsDrawerHeader(
                      accountName: Text(user.name),
                      currentAccountPicture: user.photoUrl.isNotEmpty
                          ? Image.network(user.photoUrl)
                          : null,
                      accountEmail: Text(user.email),
                    ),
              ),
              StoreConnector<AppState, Function()>(
                converter: (store) => () => store.dispatch(SignOutAction()),
                builder: (context, callback) => ListTile(
                      title: Text('Wyloguj'),
                      onTap: () {
                        Navigator.pop(context);
                        callback();
                      },
                    ),
              ),
            ],
          ),
        ),
      );
}
