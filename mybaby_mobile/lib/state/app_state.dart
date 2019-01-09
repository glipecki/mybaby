enum AuthenticationState {
  // Before authentication checked. May result in authenticated or anonymous.
  unknown,
  // During user credentials validations.
  authenticating,
  // User authenticated.
  authenticated,
  // User not authenticated.
  anonymous
}

class User {
  final String name;
  final String email;
  final String photoUrl;

  User({this.name, this.email, this.photoUrl});

  copyWith({String name, String email, String photoUrl}) => User(
        name: name ?? this.name,
        email: email ?? this.email,
        photoUrl: photoUrl ?? this.photoUrl,
      );
}

class Authentication {
  final AuthenticationState state;
  final User user;

  Authentication({this.state, this.user});

  copyWith({AuthenticationState state, User user}) => Authentication(
        state: state ?? this.state,
        user: user ?? this.user,
      );
}

class Baby {
  final String firstName;
  final String secondNamd;
  final String surname;
  final DateTime birthday;
  final String personalId;

  Baby(
    this.firstName,
    this.secondNamd,
    this.surname,
    this.birthday,
    this.personalId,
  );
}

class AppState {
  final Authentication authentication;
  final List<Baby> babies;
  final Baby currentBaby;

  AppState({this.authentication, this.babies, this.currentBaby});

  copyWith({
    Authentication authentication,
    List<Baby> babies,
    Baby currentBaby,
  }) =>
      AppState(
        authentication: authentication ?? this.authentication,
        babies: babies ?? this.babies,
        currentBaby: currentBaby ?? this.currentBaby,
      );

  static initial() => AppState(
      authentication: Authentication(
        state: AuthenticationState.unknown,
      ),
      babies: [Baby("a", "a", "a", DateTime.now(), "a")],
      currentBaby: null);
}
