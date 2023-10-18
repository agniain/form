import React from "react";
import * as Validator from 'validatorjs';


const input = ({ label, type, name, checked, value, onChange, options }) => {
    return (
        <div>
            <label>{label}:</label>
            <br />
            {type === 'select' ? (
                <select name={name} value={value} onChange={e => onChange(e.target.value)} required>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                type === 'textarea' ? (
                    <textarea name={name} value={value} onChange={e => onChange(e.target.value)} cols="50" rows="10" required />
                ) : (
                    type === 'checkbox' ? (
                        <input type="checkbox" name={name} checked={checked} onChange={e => onChange(e.target.checked)} />
                    ) : (
                        <input type={type} name={name} value={value} onChange={e => onChange(e.target.value)} required />
                    )
                )
            )}
            <br />
        </div>
    );
};

const jurusanOptions = [
    { value: "", label: "Pilih Jurusan" },
    { value: "Teknik Informatika", label: "Teknik Informatika" },
    { value: "Matematika", label: "Matematika" },
    { value: "Ilmu Gizi", label: "Ilmu Gizi" }
];

const ShowErrors = ({ errors }) => {
    return (
        <ul style={{ color: 'red', marginLeft: '-20px' }}>
            {errors.map((error, i) => (
                <li key={i}>{error}</li>
            ))}
        </ul>
    );
};

class CombinedForm extends React.Component {
    state = {
        email: '',
        password: '',
        form: {
            nama: '',
            jurusan: '',
            gender: '',
            alamat: '',
            member: false,
        },
        formErrors: []
    };

    handleFormChange = (fieldName, value) => {
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [fieldName]: value
            }
        }));
    };

    handleFormSubmit = event => {
        event.preventDefault();

        const { email, password, form } = this.state;
        const data = { email, password, ...form };

        const rules = {
            email: 'required|email',
            password: 'required|min:8',
            nama: 'required',
            jurusan: 'required',
            gender: 'required',
            alamat: 'required',
        };

        const validation = new Validator(data, rules);
        validation.passes();

        if (validation.fails()) {
            this.setState({
                formErrors: validation.errors.all()
            });
        } else {
            const memberStatus = form.member ? 'YES' : 'NO';
            const alertMessage = `
            Nama: ${data.nama}\n
            Jurusan: ${data.jurusan}\n
            Jenis Kelamin: ${data.gender}\n
            Alamat: ${data.alamat}\n
            Email: ${data.email}\n
            Password: ${data.password}\n
            Member: ${memberStatus}`;
            alert('Selamat! Data Anda Telah Berhasil Terdaftar!\n' + alertMessage);
        }
    };

    render() {
        const { form, formErrors, email, password } = this.state;

        return (
            <div style={{ width: '400px', margin: '100px auto 0', border: '1px solid black', padding: '10px' }}>
                {formErrors && <ShowErrors errors={Object.values(formErrors)} />}
                <h4>SUBMISSION FORM</h4>
                <form onSubmit={this.handleFormSubmit}>
                    {input({ label: 'Nama', type: 'text', name: 'nama', value: form.nama, 
                    onChange: (value) => this.handleFormChange('nama', value) })}
                    {input({ label: 'Jurusan', type: 'select', name: 'jurusan', value: form.jurusan, 
                    onChange: (value) => this.handleFormChange('jurusan', value), options: jurusanOptions })}
                    <div>
                        <label>Jenis Kelamin:</label>
                        <br />
                        <input type="radio" name="gender" value="Laki-laki" 
                        onChange={(e) => this.handleFormChange('gender', e.target.value)} required />Laki-laki
                        <input type="radio" name="gender" value="Perempuan" 
                        onChange={(e) => this.handleFormChange('gender', e.target.value)} required />Perempuan
                        <br />
                    </div>
                    {input({ label: 'Alamat', type: 'textarea', name: 'alamat', value: form.alamat, 
                    onChange: (value) => this.handleFormChange('alamat', value) })}
                    {input({ label: 'Email', type: 'email', name: 'email', value: email, 
                    onChange: (value) => this.setState({ email: value }) })}
                    {input({ label: 'Password', type: 'password', name: 'password', value: password, 
                    onChange: (value) => this.setState({ password: value }) })}
                    <br />
                    {input({ label: 'Member', type: 'checkbox', name: 'member', checked: form.member, 
                    onChange: (checked) => this.handleFormChange('member', checked) })}
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default CombinedForm;
