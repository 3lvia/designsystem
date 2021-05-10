import styled from 'styled-components';

export const EWCBreadcrumbs = styled.div`


    a:last-child {
    font-weight: 500;
    color: #000;
    }
    i:last-child {
    font-weight: 500;
    color: #000;
    }

`;

export const EWCBreadcrumbsLink = styled.a`

    font-family: Red Hat Text;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.2px;
    text-align: left;
    text-decoration: none;
    color: #515151;

    &:hover {
      text-decoration: underline;
    }
`;

export const EWCBreadcrumbIconRight = styled.i`
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.514 23.77a.766.766 0 01.012-1.084L17.456 12 6.525 1.314A.766.766 0 117.597.218l10.948 10.705A1.514 1.514 0 0119 12a1.5 1.5 0 01-.455 1.077L7.597 23.782a.766.766 0 01-1.083-.012z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    height: 8px;
    width: 8px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    margin-right: 0 8px;
`;

export const EWCBreadcrumbIconLeft= styled.i`
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.486.23a.766.766 0 01-.012 1.084L6.544 12l10.93 10.686a.766.766 0 01-1.071 1.096L5.455 13.077A1.513 1.513 0 015 12a1.5 1.5 0 01.455-1.077L16.403.218a.766.766 0 011.083.012z' fill='black'/%3e%3c/svg%3e");
    height: 8px;
    width: 8px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    margin-right: 8px;
`;
