<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua Conta</h1>
    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="input-label-text">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          :class="{
            'border-brand-danger': !!state.email.errorMessage,
          }"
          class="input-field"
          placeholder="john.doe@gmail.com"
        />
        <span v-if="!!state.email.errorMessage" class="input-field-error">
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="input-label-text">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMessage,
          }"
          class="input-field"
          placeholder="**********"
        />
        <span v-if="!!state.password.errorMessage" class="input-field-error">
          {{ state.password.errorMessage }}
        </span>
      </label>
      <button
        :disabled="state.Loading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading,
        }"
        class="button-login"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import useModal from '../../hooks/useModal'
import Icon from '../Icon'
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail
} from '../../utils/validators'
import services from '../../services'

export default {
  components: { Icon },
  setup () {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      validateEmptyAndEmail
    )
    const { value: passwordValue, errorMessage: passwordErrorMessage } =
      useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasError: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push({ name: 'Feedbacks' })
          state.isLoading = false
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('E-mail não encontrado')
        }
        if (errors.status === 401) {
          toast.error('E-mail/senha inválidos')
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o login')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer o login')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>

<style lang="postcss" scoped>
.input-label-text {
  @apply text-lg
    font-medium
  text-gray-800;
}
.input-field {
  @apply block
    w-full
    px-4
    py-3
    mt-1
    text-lg
  bg-gray-100
    border-2
    border-transparent
    rounded;
}

.input-field-error {
  @apply block
    font-medium
    text-brand-danger;
}

.button-login {
  @apply px-8
    py-3
    mt-10
    text-2xl
    font-bold
    text-white
    rounded-full
  bg-brand-main
    focus:outline-none
    transition-all
    duration-150;
}
</style>
