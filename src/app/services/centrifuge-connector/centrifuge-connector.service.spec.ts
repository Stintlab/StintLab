import { TestBed } from '@angular/core/testing';

import { CentrifugeConnectorService } from './centrifuge-connector.service';

describe('CentrifugeConnectorService', () => {
  let service: CentrifugeConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentrifugeConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
