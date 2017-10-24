import { HalProperty,HalLink,HalResolve, HalModel,HalPage } from '../';
import {Observable} from 'rxjs/Rx';

export class TestModel extends HalModel {

    @HalProperty()
    test : string;

    @HalLink(TestModel)
    testLink : Observable<TestModel>;

    @HalLink(TestModel,'relationTestLink')
    namedLink : Observable<TestModel>;

    @HalLink(TestModel)
    testLinks : Observable<HalPage<TestModel>>;


}

export class ResolveTestModel extends HalModel {

    @HalLink(TestModel)
    link : Observable<TestModel>;

    @HalResolve('link.testLink.test')
    resolve : string;
}

export class FlatResolveTestModel extends HalModel {
    @HalLink(TestModel)
    link : Observable<HalPage<TestModel>>;

    @HalResolve('link.testLinks.test',true)
    resolve : string;
}