function apiRequest({ method = 'GET', url, payload = {}, headers = { Authorization: `Bearer ${localStorage.getItem('_token')}` } }) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: method.toUpperCase(),
            data: payload,
            // contentType: 'application/json',
            // dataType: 'json',
            headers: headers,
            success: resolve,
            error: (xhr, status, error) => {
                reject({ xhr, status, error });
            }
        });
    });
}