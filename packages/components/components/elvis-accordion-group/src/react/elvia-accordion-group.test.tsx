import AccordionGroup from './elvia-accordion-group';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Elvis Accordion', () => {
  // describe('Type = normal', () => {
  //   beforeEach(() => {
  //     render(
  //       <AccordionGroup
  //         items={[
  //           'Det er ikke bare utendørs du bør følge med på farlige forhold, det finnes også ting i hjemmet du bør være obs på. Opplever du for eksempel å få støt når du tar på vannkranen eller andre elektriske apparater, er det et dårlig tegn. Det samme gjelder om sikringen går uten at du vet hvorfor, eller at sikringen går hver gang du bruker to apparater samtidig. Dette skal ikke skje og kan være tegn på at det er fare på ferde i det elektriske anlegget. ',
  //           'Strøm er det du betaler for ditt faktiske strømforbruk, mens nettleie er det du betaler for at strømmen overføres til boligen din. Strøm og nettleie er to forskjellige ting, men er avhengige av hverandre. Du er derfor nødt til å betale for begge deler for å bruke strøm hjemme.',
  //           'For å åpne HAN-porten kan du logge inn på Min side og bestille dette.',
  //         ]}
  //         labels={[
  //           {
  //             open: 'Følg med på farlige forhold hjemme',
  //             close: 'Følg med på farlige forhold hjemme',
  //           },
  //           {
  //             open: 'Hva er forskjellen mellom strøm og nettleie?',
  //             close: 'Hva er forskjellen mellom strøm og nettleie?',
  //           },
  //           { open: 'HAN-port', close: 'HAN-port' },
  //         ]}
  //       />,
  //     );
  //   });
  // });

  describe.skip('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="accordions">
          <AccordionGroup
            items={[
              'Det er ikke bare utendørs du bør følge med på farlige forhold, det finnes også ting i hjemmet du bør være obs på. Opplever du for eksempel å få støt når du tar på vannkranen eller andre elektriske apparater, er det et dårlig tegn. Det samme gjelder om sikringen går uten at du vet hvorfor, eller at sikringen går hver gang du bruker to apparater samtidig. Dette skal ikke skje og kan være tegn på at det er fare på ferde i det elektriske anlegget. ',
              'Strøm er det du betaler for ditt faktiske strømforbruk, mens nettleie er det du betaler for at strømmen overføres til boligen din. Strøm og nettleie er to forskjellige ting, men er avhengige av hverandre. Du er derfor nødt til å betale for begge deler for å bruke strøm hjemme.',
              'For å åpne HAN-porten kan du logge inn på Min side og bestille dette.',
            ]}
            labels={[
              {
                open: 'Følg med på farlige forhold hjemme',
                close: 'Følg med på farlige forhold hjemme',
              },
              {
                open: 'Hva er forskjellen mellom strøm og nettleie?',
                close: 'Hva er forskjellen mellom strøm og nettleie?',
              },
              { open: 'HAN-port', close: 'HAN-port' },
            ]}
          />
        </div>,
      );

      const accordions = screen.getByTestId('accordions');
      const results = await axe(accordions);

      expect(results).toHaveNoViolations();
    });
  });
});
