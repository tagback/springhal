import { HalProperty, HalModel } from '../src/';

export class TestModel implements HalModel {

    @HalProperty()
    test : string;
}