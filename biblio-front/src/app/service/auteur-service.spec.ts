import { TestBed } from '@angular/core/testing';
imoport {AuteurService} from './auteur-service'

describe('AuteurService', () => {
  let service: AuteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
