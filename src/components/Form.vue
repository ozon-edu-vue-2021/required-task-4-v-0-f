<template>
  <form autocomplete="off" class="form" v-on:submit.prevent>
    <h2>Личные данные</h2>

    <div class="row">
      <label>
        Фамилия
        <input id="surname" placeholder="Фамилия" v-model="formData.surname" />
      </label>
      <label>
        Имя
        <input id="name" placeholder="Имя" v-model="formData.name" />
      </label>
      <label>
        Отчество
        <input
          id="middleName"
          placeholder="Отчество"
          v-model="formData.middleName"
        />
      </label>
    </div>

    <div class="row">
      <label>
        Дата рождения
        <input
          id="birthDate"
          placeholder="дд.мм.гггг"
          v-model="formData.birthDate"
        />
      </label>
    </div>

    <div class="row">
      <label>
        E-mail
        <input
          id="email"
          placeholder="example@example.ru"
          v-model="formData.email"
        />
      </label>
    </div>

    <h3>Пол</h3>
    <div class="row">
      <label class="radio">
        Мужской
        <input
          name="gender"
          type="radio"
          v-model="formData.gender"
          v-bind:value="'male'"
        />
      </label>
      <label class="radio">
        Женский
        <input
          name="gender"
          type="radio"
          v-model="formData.gender"
          v-bind:value="'female'"
        />
      </label>
    </div>

    <h2>Паспортные данные</h2>

    <div class="row">
      <label>
        Гражданство
        <select
          name="citizenship"
          id="citizenship"
          v-model="formData.citizenship"
        >
          <option
            v-for="citizenship of citizenships"
            :key="citizenship.uid"
            v-bind:value="citizenship.nationality"
          >
            {{ citizenship.nationality }}
          </option>
        </select>
      </label>
    </div>

    <div class="row" v-show="formData.citizenship !== 'Russia'">
      <label>
        Фамилия на латинице
        <input
          id="surnameInLatin"
          placeholder="Фамилия"
          v-model="formData.surnameInLatin"
        />
      </label>
      <label>
        Имя на латинице
        <input
          id="nameInLatin"
          placeholder="Имя"
          v-model="formData.nameInLatin"
        />
      </label>
    </div>

    <div class="row">
      <label v-show="formData.citizenship === 'Russia'">
        Серия паспорта
        <input
          id="passportSeries"
          placeholder="1234"
          v-model="formData.passportSeries"
        />
      </label>
      <label>
        Номер паспорта
        <input
          id="passportNumber"
          placeholder="123456"
          v-model="formData.passportNumber"
        />
      </label>
      <label v-show="formData.citizenship === 'Russia'">
        Дата выдачи
        <input
          id="passportDate"
          placeholder="дд.мм.гггг"
          v-model="formData.passportDate"
        />
      </label>
      <label v-show="formData.citizenship !== 'Russia'">
        Страна выдачи
        <select
          name="passportCountry"
          id="passportCountry"
          v-model="formData.passportCountry"
        >
          <option
            v-for="country of citizenships"
            :key="country.uid"
            v-bind:value="country.nationality"
          >
            {{ country.nationality }}
          </option>
        </select>
      </label>
      <label v-show="formData.citizenship !== 'Russia'">
        Тип паспорта
        <select
          name="passportType"
          id="passportType"
          v-model="formData.passportType"
        >
          <option
            v-for="pass of passportTypes"
            :key="pass.id"
            v-bind:value="pass.type"
          >
            {{ pass.type }}
          </option>
        </select>
      </label>
    </div>

    <h3>Меняли ли фамилию или имя?</h3>
    <div class="row">
      <label class="radio">
        Нет
        <input
          name="nameIsChanged"
          type="radio"
          v-model="formData.nameIsChanged"
          v-bind:value="false"
        />
      </label>
      <label class="radio">
        Да
        <input
          name="nameIsChanged"
          type="radio"
          v-model="formData.nameIsChanged"
          v-bind:value="true"
        />
      </label>
    </div>

    <div class="row" v-show="formData.nameIsChanged">
      <label>
        Предыдущая фамилия
        <input
          id="previousSurname"
          placeholder="Фамилия"
          v-model="formData.previousSurname"
        />
      </label>
      <label>
        Предыдущее имя
        <input
          id="previousName"
          placeholder="Имя"
          v-model="formData.previousName"
        />
      </label>
    </div>
    <div class="bottom">
      <button type="button" @click="onSubmit">Отправить</button>
    </div>
  </form>
</template>

<script>
import passportTypes from "../assets/data/passport-types.json";
import citizenships from "../assets/data/citizenships.json";
export default {
  data() {
    return {
      formData: {
        name: "",
        surname: "",
        middleName: "",
        nameInLatin: "",
        surnameInLatin: "",
        nameIsChanged: false,
        previousName: "",
        previousSurname: "",
        birthDate: "",
        email: "",
        gender: "male",
        citizenship: "",
        passportSeries: null,
        passportNumber: null,
        passportDate: null,
        passportType: "",
        passportCountry: "",
      },
      passportTypes: [],
      citizenships: [],
    };
  },
  methods: {
    onSubmit: function () {
      console.log(JSON.stringify(this.formData, null, "\t"));
    },
  },
  created() {
    this.passportTypes = passportTypes;
    this.citizenships = citizenships;
    this.formData.citizenship = citizenships[0].nationality;
  },
};
</script>

<style scoped>
form {
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid #ccc;
}

label:not(.radio) input {
  outline: none;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
}

label:not(.radio) {
  display: inline-flex;
  flex-direction: column;
  margin-right: 10px;
}

.radio {
  margin-right: 20px;
}

.row {
  margin-bottom: 20px;
}

.bottom {
  display: flex;
  justify-content: flex-end;
}

button {
  width: 200px;
  height: 50px;
  background: #3473e6;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 5px;
}

button:hover {
  background: #0b59e8;
  cursor: pointer;
}

select {
  background: white;
  border: 2px solid #ccc;
  height: 36px;
  border-radius: 5px;
  outline: none;
}
</style>
