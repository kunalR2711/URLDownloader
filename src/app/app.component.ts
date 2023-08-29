import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'url-downloader';

  urlInput!:HTMLInputElement;
  downloadBtn!: HTMLButtonElement;

  constructor(){}

  ngAfterViewInit(){
    this.urlInput = document.querySelector("input") as HTMLInputElement;
    this.downloadBtn = document.querySelector("button") as HTMLButtonElement;
    this.downloadBtn.addEventListener("click", () => {
      const url=this.urlInput.value;
      if(url)
      {
        this.downloadFile(url)
        .then(() => {
          console.log("File downloaded successfully");
        })
        .catch((error) => {
          console.error("Error downloading the file:", error);
          window.alert(error);
        });
      }
      else{
        window.alert("Can't fetch the URL");
      }
    });
  }

  async downloadFile(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const file = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = new Date().getTime().toString();
      link.click();
    } catch(error) {
      throw new Error("Failed to download the file!");
    }
  }
}

