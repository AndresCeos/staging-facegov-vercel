// eslint-disable-next-line max-len
const profileAcronym = (firstName: string | null, lastName: string | null) => ((firstName === null || lastName == null) ? 'S' : `${firstName.charAt(0) ?? ''}${lastName.charAt(0) ?? 'S'}`.toUpperCase());

export default profileAcronym;
