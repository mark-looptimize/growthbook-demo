import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('content-tab')
export class ContentTab extends LitElement {
  @property({type: Boolean,  attribute: 'sample-feature-enabled'})
  sampleFeatureEnabled? :Boolean;

  protected render() {
    if (this.sampleFeatureEnabled === undefined) {
      return html`<p>The sample feature setting is not defined</p>`;
    }
    return this.sampleFeatureEnabled
    ? html`<p>The sample feature is enabled</p>`
    : html`<p>The sample feature is not enabled</p>`;
  }
}