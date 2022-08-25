declare function request(
  url: String,
  options: {
    headers: Object;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE|';
    body: String;
  }
): Promise<{
  json(): Object;
  text(): String;
  buffer(): Buffer;
}>;

export = request;
