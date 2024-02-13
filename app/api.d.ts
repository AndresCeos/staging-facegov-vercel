declare namespace Api {
  interface Response<T> {
    status: number;
    results: T;
  }

  type AuthStatus = {
    authenticated: false;
  } | {
    authenticated: true;
    user: User;
  };

  interface State {
    id: number;
    name: string;
  }

  interface User {
    id: number;
    firstName: string | null;
    lastName: string | null;
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

  type Media = {
    featured: string;
  };

  interface Scholarship {
    id: number;
    name: string;
    slug: string;
  }

  interface Employment {
    id: number;
    jobTitle: string;
    currentJob: boolean;
    salary: number;
    startDate: Date;
    endDate: Date | null;
    politicalParty: PoliticalParty;
  }

  interface PoliticalFigure {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    biography: string;
    politicalParty: PoliticalParty;
    city: City;
    canUserComment: boolean;
    rating: number;
    media: Media[];
    tags: string[];
    employmentHistory: Employment[];
    scholarships: Scholarship[];
  }

  interface Comment {
    id: number;
    text: string;
    rating: number;
    createdAt: Date;
    user: User;
    utility: number;
    userUtility: boolean | null;
  }
}
