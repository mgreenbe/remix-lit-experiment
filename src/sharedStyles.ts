import { css } from "lit";

export const sharedStyles = css`
  textarea,
  input {
    box-sizing: inherit;
    font-size: 1rem;
    font-family: inherit;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 0px 1px hsl(0deg 0% 0% / 20%), 0 1px 2px hsl(0deg 0% 0% / 20%);
    background-color: white;
    line-height: 1.5;
    margin: 0;
  }
  textarea:hover,
  input:hover {
    box-shadow: 0 0px 1px hsl(0deg 0% 0% / 60%), 0 1px 2px hsl(0deg 0% 0% / 20%);
  }
  input[type="search"] {
    padding-left: 2rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 0.625rem 0.75rem;
    background-size: 1rem;
    position: relative;
  }
  button {
    color: #3992ff;
    font-weight: 500;
    font-size: 1rem;
    font-family: inherit;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 0px 1px hsl(0deg 0% 0% / 20%), 0 1px 2px hsl(0deg 0% 0% / 20%);
    background-color: white;
    line-height: 1.5;
    margin: 0;
  }
  button:hover {
    box-shadow: 0 0px 1px hsl(0deg 0% 0% / 60%), 0 1px 2px hsl(0deg 0% 0% / 20%);
  }
  button.destroy {
    color: #f44250;
  }
  button.cancel {
    color: inherit;
  }
`;
