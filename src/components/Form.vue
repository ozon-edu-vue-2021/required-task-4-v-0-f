<template>
  <form autocomplete="off" class="form" v-on:submit.prevent>
    <h2>Личные данные</h2>

    <div class="row">
      <label>
        Фамилия
        <input
          :class="{ error: validationErrors.surname }"
          placeholder="Фамилия"
          v-model="formData.surname"
        />
      </label>
      <label>
        Имя
        <input
          :class="{ error: validationErrors.name }"
          placeholder="Имя"
          v-model="formData.name"
        />
      </label>
      <label>
        Отчество
        <input
          :class="{ error: validationErrors.middleName }"
          placeholder="Отчество"
          v-model="formData.middleName"
        />
      </label>
    </div>

    <div class="row">
      <label>
        Дата рождения
        <input
          :class="{ error: validationErrors.birthDate }"
          placeholder="дд.мм.гггг"
          v-model="formData.birthDate"
        />
      </label>
    </div>

    <div class="row">
      <label>
        E-mail
        <input
          :class="{ error: validationErrors.email }"
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

    <div class="row citizenship" v-click-outside="hideDropdown">
      <label>
        Гражданство
        <input
          name="citizenship"
          id="citizenship"
          v-model="formData.citizenship"
          @focus="citizenshipDropdownOpened = true"
        />
      </label>
      <span class="clearInput" @click="onClearInput">X</span>
      <div class="dropdown" v-show="citizenshipDropdownOpened">
        <ul>
          <li
            v-for="country of countrySearchResults"
            :key="country.uid"
            v-bind:value="country.nationality"
            @click="onSelectCitizenship(country.nationality)"
          >
            {{ country.flag }}
            {{ country.nationality }}
          </li>
        </ul>
      </div>
    </div>

    <div class="row" v-show="!isRussianCitizen">
      <label>
        Фамилия на латинице
        <input
          :class="{ error: validationErrors.surnameInLatin }"
          placeholder="Фамилия"
          v-model="formData.surnameInLatin"
        />
      </label>
      <label>
        Имя на латинице
        <input
          :class="{ error: validationErrors.nameInLatin }"
          placeholder="Имя"
          v-model="formData.nameInLatin"
        />
      </label>
    </div>

    <div class="row">
      <label v-show="isRussianCitizen">
        Серия паспорта
        <input
          :class="{ error: validationErrors.passportSeries }"
          placeholder="1234"
          v-model="formData.passportSeries"
        />
      </label>
      <label>
        Номер паспорта
        <input
          :class="{ error: validationErrors.passportNumber }"
          placeholder="123456"
          v-model="formData.passportNumber"
        />
      </label>
      <label v-show="isRussianCitizen">
        Дата выдачи
        <input
          :class="{ error: validationErrors.passportDate }"
          placeholder="дд.мм.гггг"
          v-model="formData.passportDate"
        />
      </label>
      <label v-show="!isRussianCitizen">
        Страна выдачи
        <select name="passportCountry" v-model="formData.passportCountry">
          <option
            v-for="country of countries"
            :key="country.uid"
            v-bind:value="country.nationality"
          >
            {{ country.nationality }}
          </option>
        </select>
      </label>
      <label v-show="!isRussianCitizen">
        Тип паспорта
        <select name="passportType" v-model="formData.passportType">
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
          :class="{ error: validationErrors.previousSurname }"
          placeholder="Фамилия"
          v-model="formData.previousSurname"
        />
      </label>
      <label>
        Предыдущее имя
        <input
          :class="{ error: validationErrors.previousName }"
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
import { RUSSIA_UID } from "@/constants";
import passportTypes from "../assets/data/passport-types.json";
import countries from "../assets/data/citizenships.json";
import clickOutside from "@/directives/clickOutside";
import debounce from "@/utils/debounce";
import validators from "@/validators";

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
        passportSeries: "",
        passportNumber: "",
        passportDate: "",
        passportType: "",
        passportCountry: "",
      },
      passportTypes: [],
      countries: [],
      citizenship: null,
      citizenshipDropdownOpened: false,
      countrySearchResults: [],
      validationErrors: {},
    };
  },
  directives: {
    clickOutside,
  },
  computed: {
    isRussianCitizen: function () {
      return this.citizenship && this.citizenship.uid === RUSSIA_UID;
    },
  },
  methods: {
    onSubmit: function () {
      this.validateForm();
      console.log(JSON.stringify(this.formData, null, "\t"));
    },
    validateForm: function () {
      this.validateErrors();
      // reset validation on form update
      this.unwatch = this.$watch(
        "formData",
        function () {
          this.validationErrors = {};
          this.unwatch && this.unwatch();
        },
        { deep: true }
      );
    },
    hideDropdown: function () {
      this.citizenshipDropdownOpened = false;
    },
    onSelectCitizenship: function (country) {
      this.formData.citizenship = country;
      this.citizenshipDropdownOpened = false;
    },
    onClearInput: function () {
      this.formData.citizenship = "";
      this.citizenshipDropdownOpened = true;
    },
    updateCitizenship: function (citizenshipValue) {
      const citizenship = this.countries.find(
        (country) => country.nationality === citizenshipValue
      );
      if (citizenship) this.citizenship = citizenship;
    },
    updateCountrySearchResults: function (citizenshipValue) {
      if (!citizenshipValue) this.countrySearchResults = this.countries;
      const query = citizenshipValue.toLowerCase();
      this.countrySearchResults = this.countries.filter((country) =>
        country.nationality.toLowerCase().includes(query)
      );
    },
    validateErrors: function () {
      let validationResult = ["name", "surname", "middleName"].map((input) => [
        input,
        !validators.russianLetters(this.formData[input]),
      ]);
      if (this.formData.nameIsChanged) {
        validationResult = validationResult.concat(
          ["previousSurname", "previousName"].map((input) => [
            input,
            !validators.russianLetters(this.formData[input]),
          ])
        );
      }
      validationResult.push([
        "birthDate",
        !validators.date(this.formData.birthDate),
      ]);
      validationResult.push(["email", !validators.email(this.formData.email)]);
      if (this.isRussianCitizen) {
        validationResult = validationResult.concat([
          [
            "passportSeries",
            !validators.passportSeries(this.formData.passportSeries),
          ],
          [
            "passportNumber",
            !validators.passportNumberRu(this.formData.passportNumber),
          ],
        ]);
      } else {
        validationResult.push([
          "passportNumber",
          !validators.passportNumber(this.formData.passportNumber),
        ]);
        validationResult = validationResult.concat(
          ["nameInLatin", "surnameInLatin"].map((input) => [
            input,
            !validators.englishLetters(this.formData[input]),
          ])
        );
      }
      this.validationErrors = Object.fromEntries(validationResult);
    },
  },
  created() {
    this.passportTypes = passportTypes;
    this.countries = countries;
    this.formData.citizenship = countries[0].nationality;
  },
  watch: {
    "formData.citizenship": {
      handler: debounce(function (citizenshipValue) {
        this.updateCitizenship(citizenshipValue);
        this.updateCountrySearchResults(citizenshipValue);
      }, 500),
      immediate: true,
    },
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

input#citizenship {
  width: 250px;
}
.dropdown {
  position: relative;
}

ul {
  width: 250px;
  height: 200px;
  position: absolute;
  overflow: auto;
  background: #fff;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}
li {
  list-style-type: none;
  padding: 5px 20px;
}
li:hover {
  background: #e8f1f9;
  cursor: pointer;
}
.clearInput {
  height: 20px;
  position: absolute;
  color: #666;
  cursor: pointer;
  bottom: 0;
  display: block;
  left: 230px;
  top: 30px;
}
.citizenship {
  position: relative;
}

label input.error {
  border: 2px solid red;
}
</style>
