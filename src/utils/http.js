export function getPokes(url)
{
    return fetch(url).then(function(response)
    {
        return response.json();
    })
}