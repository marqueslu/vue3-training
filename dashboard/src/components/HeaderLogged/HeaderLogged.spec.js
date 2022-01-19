import { shallowMount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router'
import HeaderLogged from './'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = { currentUser: {} }
jest.mock('../../hooks/useStore', () => {
  return () => {
    return mockStore
  }
})

describe('<HeaderLogged />', () => {
  let wrapper

  beforeEach(async () => {
    router.push('/')
    await router.isReady()
    wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })
  })

  it('should render header logged correctly', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render three dots when there\'s no user logged', async () => {
    const buttonLogout = wrapper.find('#logout-button')
    expect(buttonLogout.text()).toBe('...')
  })

  it('should render user when exists a logged user', async () => {
    mockStore.currentUser.name = 'User'

    wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLogout = wrapper.find('#logout-button')

    expect(buttonLogout.text()).toBe('User (sair)')
  })
})
