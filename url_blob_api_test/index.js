// ------ creating blob ----------
const blob = new Blob(
  // blobPart
  [
`#include<bits/stdc++.h>
using namespace std;

int main() {
  cout << "Hello world" << endl;
  return 0;
}
`,
  ],
  // options
  {
    type: "text/plain"
  }
);

// --------- creating url from blob -------------
const url = URL.createObjectURL(blob);

// --------- extracting data from a blob ----------
const link = document.createElement("a");
link.download = "main.cpp"; // optional
link.href = url;
link.innerText = "download test blob data";

document.body.appendChild(link);

// or

blob.text().then(content => {
  console.log(content);
});