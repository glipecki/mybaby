import 'package:redux/redux.dart';

abstract class Saga<State> {
  void call(Store<State> store, dynamic action);
}

class AsyncMiddleware<State> implements MiddlewareClass<State> {
  final _sagas = Map<Type, List<Saga<State>>>();

  @override
  void call(Store<State> store, action, NextDispatcher next) {
    if (_sagas.containsKey(action.runtimeType)) {
      _sagas[action.runtimeType].forEach((saga) => saga(store, action));
    }
    next(action);
  }

  void take(Type type, Saga<State> saga) {
    if (_sagas[type] == null) {
      _sagas[type] = [];
    }
    _sagas[type].add(saga);
  }
}
