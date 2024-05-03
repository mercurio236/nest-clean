//error
export class Left<L, R> {
  readonly value: L; //ela nunca vai ser alterada após a sua inicialização

  constructor(value: L) {
    this.value = value;
  }

  //Metodos auxiliares

  isRight(): this is Right<L, R> {
    return false;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }
}

//success
export class Right<R, L> {
  readonly value: R; //ela nunca vai ser alterada após a sua inicialização

  constructor(value: R) {
    this.value = value;
  }

  //Metodos auxiliares

  isRight(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }
}

export type Either<L, R> = Left<L, R> | Right<R, L>;

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};
