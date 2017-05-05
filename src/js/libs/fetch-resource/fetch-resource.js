/**
 * Fetches a remote resource asynchronously
 * @param {String} url - The url of the resource to fetch
 * @param {String} returnType - The desired return type of the data
 * (currently either 'blob' or 'arrayBuffer')
 * @returns {Object} A promise with the resource
 */
const fetchResource = (url, returnType) => {
  return window.fetch(url, {
    method: 'GET',
  })
  .then((response) => {
    let formattedResponse = response;

    if (returnType === 'blob') {
      formattedResponse = response.blob();
    }

    if (returnType === 'arrayBuffer') {
      formattedResponse = response.arrayBuffer();
    }

    return formattedResponse;
  })
  .catch((error) => {
    return error;
  });
};

export default fetchResource;
