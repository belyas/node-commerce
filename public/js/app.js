(function() {
    const removeEl = document.querySelector('.removeElement');

    removeEl &&
        removeEl.addEventListener('click', function(event) {
            const _id = this.getAttribute('data-form-id');
            const getForm = document.getElementById('remove-form-' + _id);

            if (!getForm) {
                return;
            }

            getForm.submit();
        });
})();
