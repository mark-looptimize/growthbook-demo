/* eslint-disable no-console */
import {ReactiveController, ReactiveControllerHost} from 'lit';
import { Experiment, GrowthBook, Result } from "@growthbook/growthbook";
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase.js';
import { UserService } from './user-service.js';

export class FeatureController implements ReactiveController {
  host: ReactiveControllerHost;

  analyticsService = analytics;

  sampleFeatureEnabled = false;

  growthBook = new GrowthBook({
    apiHost: "https://cdn.growthbook.io",
    clientKey: "sdk-UWplF34GF7k6wahK",
    enableDevMode: true,
    trackingCallback: (experiment, result) => this.logExperiment(experiment, result)
  });

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  // NOTE: This is the callback for when the host Application is started
  async hostConnected() {
    console.log('Initializing Feature Controller');
    await this.growthBook.loadFeatures({ autoRefresh: true });

    this.growthBook.setAttributes({
      "vip_user": UserService.vipStatus
    });

    if (this.growthBook.isOn("sample-feature")) {
      console.log("Feature is enabled!")
      this.sampleFeatureEnabled = true;
      logEvent(this.analyticsService, "feature_flag_enabled", {
        feature_flag_id: "sample-feature"
      });
    }
  }

  // This is where we log any experiment impressions in our analtics service
  logExperiment(experiment: Experiment<any>, result: Result<any>): void{
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key
    });

    logEvent(this.analyticsService, "experiment_impression", {
      experiment_id: experiment.key,
      variant_id: result.key
    });
  }
}