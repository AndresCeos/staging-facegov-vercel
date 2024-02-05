declare namespace Api {
  interface Response<T> {
    status: number;
    results: T;
  }

  interface State {
    id: number;
    name: string;
  }

  interface City {
    id: number;
    name: string;
    state: State;
  }

  interface PoliticalParty {
    id: number;
    name: string;
    acronym: string;
  }

  interface PoliticalFigure {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    biography: string;
    politicalParty: PoliticalParty;
    city: City;
  }
}
