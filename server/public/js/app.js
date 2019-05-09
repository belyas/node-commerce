(function () {
    const removeEl = document.querySelector('.removeElement');

    removeEl && removeEl.addEventListener('click', function (event) {
        const _id = this.getAttribute('data-form-id');
        const getForm = document.getElementById('remove-form-' + _id);

        console.log('[el]', this, _id, getForm);

        if (!getForm) {
            console.log('form not found')
            return;
        }

        getForm.submit();
    });
})();