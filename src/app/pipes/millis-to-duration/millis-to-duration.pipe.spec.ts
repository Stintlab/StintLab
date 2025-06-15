import { MillisToDurationPipe } from './millis-to-duration.pipe';

describe('MillisToDurationPipe', () => {
  it('create an instance', () => {
    const pipe = new MillisToDurationPipe();
    expect(pipe).toBeTruthy();
  });
});
