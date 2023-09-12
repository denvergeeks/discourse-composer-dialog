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
  '<dialog id=\"dialog\">',
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
