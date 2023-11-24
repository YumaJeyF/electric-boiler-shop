export const getProducts = async () => {
    const url = './../../json/pagesProducts.json';

    const response = await fetch(url);

    if (response.ok) return await response.json();
    else throw new Error(`Ошибка, статус ошибки ${response.status}`);
}