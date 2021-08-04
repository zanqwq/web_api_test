

# API

## Blob

### constructor
```js
declare var Blob: {
  prototype: Blob;
  new(blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};

type BlobPart = BufferSource | Blob | string;
type BufferSource = ArrayBufferView | ArrayBuffer;

interface BlobPropertyBag {
    endings?: EndingType;
    type?: string;
}
```

### property
* `size`
* `type`

### method
* `arrayBuffer`: return a promise which resolves array buffer as value
* `slice`: return a new blob
* `stream`: return a ReadableStream
* `text`: return a promise which resolves the text as value

## URL
* `URL.createObjectURL`: take blob object as param and return a string url