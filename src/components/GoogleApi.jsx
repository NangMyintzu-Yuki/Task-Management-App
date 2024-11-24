import { gapi } from "gapi-script";
import { useEffect } from "react";

const CLIENT_ID = "99854061506-p3tsepphg39c5he8fima5kg7fqn5nafa.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/tasks"; 

const useGoogleApi = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
        scope: SCOPES,
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);
};

export default useGoogleApi;
