import { notice } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

function notification({ title, text }) {
  return notice({
    title: title,
    text: text,
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: (notice) => {
                notice.close();
              },
            },
          ],
        },
      ],
    ]),
  });
}

export default notification;
