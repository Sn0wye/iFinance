export const cn = (
  active: boolean,
  activeClassName: string,
  elseClassName: string = ''
) => {
  return active ? activeClassName : elseClassName;
};
