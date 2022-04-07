/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalculadoraService } from './calculadora.service';

describe('Service: Calculadora', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculadoraService]
    });
  });

  it('should ...', inject([CalculadoraService], (service: CalculadoraService) => {
    expect(service).toBeTruthy();
  }));
});
