import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  ser :any;
  constructor() { }

  currentserver() {
      var server = 'LOCAL';           // Current server is selected here
      return server;
    }

  setserver(server: any) {
      if (server == 'LOCAL') {
        this.ser = {
          'DOMAIN': 'http://localhost',
          'SERVERPORT': ":8091",
        }
      }

      if (server == 'TEST') {
        this.ser = {
          'DOMAIN': 'https://commoninfra.99games.in',
          'SERVERPORT': "", //8091
        }
      }
  }

  getServer() {
    let temp = this.ser;
    this.clearServer();
    return temp;
  }

  clearServer() {
    this.ser = undefined;
  }
  
}
