import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import '@material/web/checkbox/checkbox.js';
import { Checkbox } from "@material/web/checkbox/lib/checkbox.js";
import { logEvent } from "firebase/analytics";
import { UserService } from "./user-service.js";
import { analytics } from "./firebase.js";


@customElement('attribute-tab')
export class AttributeTab extends LitElement {
  @query('#vip-checkbox')
  vipCheckbox!: Checkbox;

  @property({type: Boolean})
  vipStatus = UserService.vipStatus;

  private handleCheckboxClick(){
    UserService.vipStatus = this.vipCheckbox.checked;
    logEvent(analytics, "toggle_user_status");
    this.vipStatus = UserService.vipStatus;
  }

  protected render() {
    return html`
    <p>
      <label>
        <md-checkbox @click=${this.handleCheckboxClick} id="vip-checkbox" ?checked=${this.vipStatus}></md-checkbox>
        VIP Customer
      </label>
    </p>
    `;
  }
}