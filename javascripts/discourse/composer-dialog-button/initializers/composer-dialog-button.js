import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";

export default {
  name: "composer-dialog-button",

  initialize() {
    withPluginApi("0.8", (api) => {   
      const currentLocale = I18n.currentLocale();
      if (!I18n.translations[currentLocale].js.composer) {
        I18n.translations[currentLocale].js.composer = {};
      }
      
      I18n.translations[currentLocale].js.dialog_button_title = I18n.t(themePrefix("composer_dialog_button_title"));
      I18n.translations[currentLocale].js.composer.dialog_button_text = I18n.t(themePrefix("composer_dialog_button_text"));
      
      api.modifyClass("controller:composer", {
        pluginId: "DialogButton",

        actions: {
          dialogButton() {
            this.get("toolbarEvent").applySurround(


'<dialog id="dialog">
    <form>
    <button type="submit" aria-label="close" formmethod="dialog" formnovalidate>X</button>
    <h2 id="dialogid">MLW Registration</h2>
    <p>All fields are required</p>
    <p>
        <label>Name:
           <input type="text" name="name" required />
       </label>
    </p>
    <p>
       <label>Warranty:
          <input type="number" min="0" max="10" step=”1” name="warranty" required />
        </label>
    </p>
    <p>
       <label>Power source:
           <select name="powersoure">
          <option>AC/DC</option>
          <option>Battery</option>
          <option>Solar</option>
           </select>
       </label>
    </p>
    <p>
       <button type="submit" formmethod="post">Submit</button>
    </p>
 <hr/>
    <p>Additional buttons</p>
      <button id="jsbutton">JS close</button>
      <button id="reset" type="reset">Reset</button>
  </form>',
</dialog>

<button id="modal">Open Modal dialog</button>
<p id="text"></p>



              
              

              "</dialog>",
              "dialog_button_text",
              { multiline: false }
            );
          },
        },
      });
      
      if (settings.put_in_popup_menu) {
        api.addToolbarPopupMenuOptionsCallback((controller) => {
          return {
            action: "dialogButton",
            icon: settings.composer_dialog_button_icon,
            label: "dialog_button_title",
          };
        });
      } else {
        api.onToolbarCreate(function(toolbar) {
          toolbar.addButton({
            trimLeading: true,
            id: "quick-dialog",
            group: settings.composer_dialog_button_group,
            icon: settings.composer_dialog_button_icon,
            title: "dialog_button_title",
            perform: function(e) {
              return e.applySurround(
                '<dialog>',
                "</dialog>",
                "dialog_button_text",
                { multiline: false }
              );
            }
          });
        });
      }
    });
  },
};
