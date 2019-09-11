import { CustomComponentModule } from './custom-component.module';

describe('CustomComponentModule', () => {
  let customComponentModule: CustomComponentModule;

  beforeEach(() => {
    customComponentModule = new CustomComponentModule();
  });

  it('should create an instance', () => {
    expect(customComponentModule).toBeTruthy();
  });
});
