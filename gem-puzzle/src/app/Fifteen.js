import FifteenModel from './FifteenModel';
import FifteenView from './FifteenView';

export default class Fifteen {
  constructor(state) {
    this.state = state;
  }

  getFifteens() {
    const model = new FifteenModel(this.state);
    const data = model.getCurrentState();
    const view = new FifteenView(data);
    view.render();
  }
}
