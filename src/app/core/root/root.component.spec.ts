import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RootComponent } from './root.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { RootHarness } from '@dnd-mapp/web-client/testing';

describe('RootComponent', () => {
    @Component({
        template: `<dma-root />`,
        imports: [RootComponent],
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(RootHarness),
        };
    }

    it('should create the app', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
